using FluentNHibernate.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using qcglobal.Core.Common;
using qcglobal.Core.Domain;
using qcglobal.Core.Other;
using qcglobal.Repositories.IRepository;
using qcglobal.Services.ISerivce;
using qcglobal.Services.ServiceImp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace qcglobal.FEW.Controllers
{
    public class userdataController : BaseEntitiesController<userdata>
    {
        IuserdataService _userDataService;
        IuserroleService _userroleService;
        public userdataController(IuserdataService baseService, IuserroleService userroleService) : base(baseService)
        {
            _userDataService = baseService;
            _userroleService = userroleService;
        }

        [HttpGet]
        [Route("getuser")]
        public async Task<IActionResult> getuser()
        {
            try
            {
                var userdata = await Task.FromResult(_userDataService.GetEntities());
                if (userdata != null && userdata.Count() > 0)
                {
                    var userroles = _userroleService.GetEntities();
                    if (userroles != null && userroles.Count() > 0)
                    {
                        List<int> lstuserdataid = new List<int>();
                        foreach (var item in userdata)
                        {
                            lstuserdataid = userroles.Where(x => x.userid == item.id).Select(i => i.roleid).ToList();
                            item.lstroleid = string.Join(",", lstuserdataid);
                        }
                    }

                }
                return Ok(userdata);

            }
            catch (Exception ex)
            {
                return Ok(new ServiceResult { Data = false, Message = "Đã có lỗi sảy ra!" });
            }


        }


        [HttpPost]
        [Route("adduser")]
        public async Task<IActionResult> adduser(userdata entity)
        {
            try
            {
                _userDataService.BeginTran();

                entity.password = CommonFunction.ToMD5(entity.password);
                ServiceResult resultSaveRole = await Task.FromResult(_userDataService.AddTran(entity));
                if ((bool)resultSaveRole.Data)
                {
                    if (!string.IsNullOrWhiteSpace(entity.lstroleid))
                    {
                        List<userrole> userroles = new List<userrole>();
                        String[] roleIDs = entity.lstroleid.Split(",");
                        if (roleIDs != null)
                        {
                            foreach (string item in roleIDs)
                            {
                                userrole _userrole = new userrole();
                                _userrole.userid = entity.id;
                                _userrole.roleid = Convert.ToInt32(item);
                                userroles.Add(_userrole);
                            }
                            bool resultSaveUserRole = (bool)_userroleService.AddRangeTran(userroles).Data;
                            if (resultSaveUserRole)
                            {
                                _userDataService.CommintTran();
                                return Ok(new ServiceResult { Data = true, Message = "Thêm mới thành công" });
                            }
                            else
                            {
                                _userDataService.RollBackTran();
                                return Ok(new ServiceResult { Data = false, Message = "Thêm mới thất bại" });
                            }
                        }
                        else
                        {
                            _userDataService.RollBackTran();
                            return Ok(new ServiceResult { Data = false, Message = "Thêm mới thất bại" });
                        }
                    }
                    else
                    {
                        _userDataService.CommintTran();
                        return Ok(new ServiceResult { Data = true, Message = "Thêm mới thành công" });
                    }
                }
                else
                {
                    _userDataService.RollBackTran();
                    return Ok( new ServiceResult { Data= false, Message= resultSaveRole.Message});
                }
            }
            catch (Exception ex)
            {
                _userDataService.RollBackTran();
                return Ok(new ServiceResult { Data = false, Message = "Thêm mới thất bại" });
            }


        }


        [HttpPut]
        [Route("updateuser")]
        public async Task<IActionResult> updateuser(userdata entity)
        {
            try
            {
                _userDataService.BeginTran();
                entity.password = CommonFunction.ToMD5(entity.password);
                ServiceResult resultSaveRole = await Task.FromResult(_userDataService.UpdateTran(entity));
                if ((bool)resultSaveRole.Data)
                {
                    // xóa role cũ
                    var lstUserRole = _userroleService.GetEntities();
                    
                    if (lstUserRole != null && lstUserRole.Count() > 0)
                    {
                        List<int> lstUserRoleID = new List<int>();
                        lstUserRoleID = lstUserRole.Where(x => x.userid == entity.id).Select(i => i.id).ToList();
                        if (lstUserRoleID != null && lstUserRoleID.Count() > 0)
                        {
                            var resultDelUserRole = _userroleService.DeleteRangeTran(lstUserRoleID);
                        }
                    }
                    
                    if (!string.IsNullOrWhiteSpace(entity.lstroleid))
                    {
                        List<userrole> userroles = new List<userrole>();
                        String[] roleIDs = entity.lstroleid.Split(",");
                        if (roleIDs != null)
                        {
                            foreach (string item in roleIDs)
                            {
                                userrole _userrole = new userrole();
                                _userrole.userid = entity.id;
                                _userrole.roleid = Convert.ToInt32(item);
                                userroles.Add(_userrole);
                            }
                            bool resultSaveUserRole = (bool)_userroleService.AddRangeTran(userroles).Data;
                            if (resultSaveUserRole)
                            {
                                _userDataService.CommintTran();
                                return Ok(new ServiceResult { Data = true, Message = "Cập nhật thành công" });
                            }
                            else
                            {
                                _userDataService.RollBackTran();
                                return Ok(new ServiceResult { Data = false, Message = "Cập nhật thất bại" });
                            }
                        }
                        else
                        {
                            _userDataService.CommintTran();
                            return Ok(new ServiceResult { Data = true, Message = "Cập nhật thành công" });
                        }                        
                    }
                    else
                    {
                        _userDataService.CommintTran();
                        return Ok(new ServiceResult { Data = true, Message = "Cập nhật thành công" });
                    }
                }
                else
                {
                    _userDataService.RollBackTran();
                    return Ok(new ServiceResult { Data = false, Message = resultSaveRole.Message });
                }
            }
            catch (Exception ex)
            {
                _userDataService.RollBackTran();
                return Ok(new ServiceResult { Data = false, Message = "Cập nhật thất bại" });
            }


        }


        [HttpDelete]
        [Route("deleteuser")]
        public async Task<IActionResult> deleteuser([FromBody] int[] ids)
        {
            try
            {
                _userDataService.BeginTran();
                var lstUserRole = _userroleService.GetEntities();
                List<int> lstUserRoleID = new List<int>();
                foreach (var id in ids)
                {
                    List<int> tmplstUserRoleID = lstUserRole.Where(x => x.userid == id).Select(i => i.id).ToList();
                    lstUserRoleID.AddRange(tmplstUserRoleID);
                }
                ServiceResult resultDeleteUserRole = await Task.FromResult(_userroleService.DeleteRange(lstUserRoleID));
                ServiceResult resultDeleteUserData = await Task.FromResult(_userDataService.DeleteRange(ids.ToList()));
                return Ok(resultDeleteUserData);
            }
            catch (Exception ex)
            {
                _userDataService.RollBackTran();
                return Ok(new ServiceResult { Data = false, Message = "Cập nhật thất bại" });
            }


        }

    }
}
