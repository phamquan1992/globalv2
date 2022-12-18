using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NHibernate.Mapping;
using qcglobal.Core.Other;
using qcglobal.Services.ISerivce;
using System;
using System.Collections.Generic;
using System.Linq;

namespace qcglobal.FEW.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseEntitiesController<TEntity> : ControllerBase
    {
        readonly IBaseService<TEntity> _baseService;

        public BaseEntitiesController(IBaseService<TEntity> baseService)
        {
            _baseService = baseService;
        }

        /// <summary>
        /// api lấy tất cả đối tượng
        /// </summary>
        /// <returns>danh sách đối tượng</returns>
        /// createdBy: namnguyen(15/01/2022)
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var entities = _baseService.GetEntities();
                return Ok(entities);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
            
        }

        /// <summary>
        /// api lấy đối tượng theo Id
        /// </summary>
        /// <param name="id">Id đối tượng</param>
        /// <returns>1 đối tượng tương ứng với Id</returns>
        [HttpGet("{id}")]
        public IActionResult Get(int EntityID)
        {
            try
            {
                var entity = _baseService.GetEntityById(EntityID);
                return Ok(entity);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// api thêm 1 một đối tượng
        /// </summary>
        /// <param name="entity">thông tin đối tượng thêm</param>
        [HttpPost]
        [Route("Add")]
        public IActionResult Post(TEntity entity)
        {
            try
            {
                var serviceResult = _baseService.Add(entity);
                return Ok(serviceResult);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
            

        }

        /// <summary>
        /// sửa đối tượng được lấy về từ DB theo Id
        /// </summary>
        /// <param name="id">Id đối tượng</param>
        /// <param name="entity">thông tin đối tượng sửa</param>
        [HttpPut]
        [Route("Update")]
        public IActionResult Put([FromBody] TEntity entity)
        {
            try
            {
                // thực hiện update
                var serviceResult = _baseService.Update(entity);
                if (serviceResult.QCGlobalCode == QCGlobalEnum.QCGlobalCode.NotValid)
                {
                    return BadRequest(serviceResult);
                }
                else
                {
                    return Ok(serviceResult);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
            
        }

        /// <summary>
        /// xóa một đối tượng theo Id
        /// </summary>
        /// <param name="id">Id đối tượng</param>
        [HttpDelete]
        [Route("Delete")]
        public IActionResult Delete([FromBody] int[] ids)
        {
            try
            {
                var res = _baseService.Delete(ids.ToList());
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
            
        }

    }
}
