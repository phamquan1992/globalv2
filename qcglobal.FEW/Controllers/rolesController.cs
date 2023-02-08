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
    public class rolesController : BaseEntitiesController<role>
    {
        IrolesService _roleService;
        IrolepermissionService _rolepermissionService;

        public rolesController(IrolesService baseService, IrolepermissionService rolepermissionService) : base(baseService)
        {
            _roleService = baseService;
            _rolepermissionService = rolepermissionService;
        }


        [HttpGet]
        [Route("getrole")]
        public async Task<IActionResult> getrole()
        {
            try
            {
                var roles = await Task.FromResult(_roleService.GetEntities());
                if (roles != null && roles.Count() > 0)
                {
                    var rolepermissions = _rolepermissionService.GetEntities();
                    if (rolepermissions != null && rolepermissions.Count() > 0)
                    {
                        List<int> lstrolepermissionid = new List<int>();
                        foreach (var item in roles)
                        {
                            lstrolepermissionid = rolepermissions.Where(x => x.roleid == item.id).Select(i => i.permissionid).ToList();
                            item.lstpermissionid = string.Join(",", lstrolepermissionid);
                        }
                    }
                    
                }
                return Ok(roles);

            }
            catch (Exception ex)
            {
                return Ok(new ServiceResult { Data = false, Message = "Đã có lỗi sảy ra!" });
            }


        }


        [HttpPost]
        [Route("addrole")]
        public async Task<IActionResult> addrole(role entity)
        {
            try
            {
                _roleService.BeginTran();
                ServiceResult resultSaveRole = await Task.FromResult(_roleService.AddTran(entity));
                if ((bool)resultSaveRole.Data)
                {
                    if (!string.IsNullOrWhiteSpace(entity.lstpermissionid))
                    {
                        List<rolepermission> userroles = new List<rolepermission>();
                        String[] roleIDs = entity.lstpermissionid.Split(",");
                        if (roleIDs != null)
                        {
                            foreach (string item in roleIDs)
                            {
                                rolepermission _userrole = new rolepermission();
                                _userrole.roleid = entity.id;
                                _userrole.permissionid = Convert.ToInt32(item);
                                userroles.Add(_userrole);
                            }
                            bool resultSaveUserRole = (bool)_rolepermissionService.AddRangeTran(userroles).Data;
                            if (resultSaveUserRole)
                            {
                                _roleService.CommintTran();
                                return Ok(new ServiceResult { Data = true, Message = "Thêm mới thành công" });
                            }
                            else
                            {
                                _roleService.RollBackTran();
                                return Ok(new ServiceResult { Data = false, Message = "Thêm mới thất bại" });
                            }
                        }
                        else
                        {
                            _roleService.RollBackTran();
                            return Ok(new ServiceResult { Data = false, Message = "Thêm mới thất bại" });
                        }
                    }
                    else
                    {
                        _roleService.CommintTran();
                        return Ok(new ServiceResult { Data = true, Message = "Thêm mới thành công" });
                    }
                }
                else
                {
                    _roleService.RollBackTran();
                    return Ok(new ServiceResult { Data = false, Message = resultSaveRole.Message });
                }
            }
            catch (Exception ex)
            {
                _roleService.RollBackTran();
                return Ok(new ServiceResult { Data = false, Message = "Thêm mới thất bại" });
            }


        }


        [HttpPut]
        [Route("updaterole")]
        public async Task<IActionResult> updaterole(role entity)
        {
            try
            {
                _roleService.BeginTran();
                ServiceResult resultSaveRole = await Task.FromResult(_roleService.UpdateTran(entity));
                if ((bool)resultSaveRole.Data)
                {
                    // xóa tac vu cũ
                    var lstRolePermission = _rolepermissionService.GetEntities();

                    if (lstRolePermission != null && lstRolePermission.Count() > 0)
                    {
                        List<int> lstrolepermissionid = new List<int>();
                        lstrolepermissionid = lstRolePermission.Where(x => x.roleid == entity.id).Select(i => i.id).ToList();
                        if (lstrolepermissionid != null && lstrolepermissionid.Count() > 0)
                        {
                            ServiceResult resultDelUserRole = _rolepermissionService.DeleteRangeTran(lstrolepermissionid);
                        }
                    }

                    if (!string.IsNullOrWhiteSpace(entity.lstpermissionid))
                    {

                        List<rolepermission> rolepermissions = new List<rolepermission>();
                        String[] permissions = entity.lstpermissionid.Split(",");
                        if (permissions != null)
                        {
                            foreach (string item in permissions)
                            {
                                rolepermission _rolepermission = new rolepermission();
                                _rolepermission.roleid = entity.id;
                                _rolepermission.permissionid = Convert.ToInt32(item);
                                rolepermissions.Add(_rolepermission);
                            }
                            bool resultSaveUserRole = (bool)_rolepermissionService.AddRangeTran(rolepermissions).Data;
                            if (resultSaveUserRole)
                            {
                                _roleService.CommintTran();
                                return Ok(new ServiceResult { Data = true, Message = "Cập nhật thành công" });
                            }
                            else
                            {
                                _roleService.RollBackTran();
                                return Ok(new ServiceResult { Data = false, Message = "Cập nhật thất bại" });
                            }
                        }
                        else
                        {
                            _roleService.CommintTran();
                            return Ok(new ServiceResult { Data = true, Message = "Cập nhật thành công" });
                        }
                    }
                    else
                    {
                        _roleService.CommintTran();
                        return Ok(new ServiceResult { Data = true, Message = "Cập nhật thành công" });
                    }
                }
                else
                {
                    _roleService.RollBackTran();
                    return Ok(new ServiceResult { Data = false, Message = resultSaveRole.Message });
                }
            }
            catch (Exception ex)
            {
                _roleService.RollBackTran();
                return Ok(new ServiceResult { Data = false, Message = "Cập nhật thất bại" });
            }


        }


        [HttpDelete]
        [Route("deleterole")]
        public async Task<IActionResult> deleterole([FromBody] int[] ids)
        {
            try
            {
                _roleService.BeginTran();
                var lstRolePermission = _rolepermissionService.GetEntities();
                List<int> lstRolePermissionID = new List<int>();
                foreach (var id in ids)
                {
                    List<int> tmpLstRolePermissionID = lstRolePermission.Where(x => x.roleid == id).Select(i => i.id).ToList();
                    lstRolePermissionID.AddRange(tmpLstRolePermissionID);
                }
                ServiceResult resultDeleteRolePermission = await Task.FromResult(_rolepermissionService.DeleteRange(lstRolePermissionID));
                ServiceResult resultDeleteRole = await Task.FromResult(_roleService.DeleteRange(ids.ToList()));
                return Ok(resultDeleteRole);
            }
            catch (Exception ex)
            {
                _roleService.RollBackTran();
                return Ok(new ServiceResult { Data = false, Message = "Cập nhật thất bại" });
            }


        }

    }
}
