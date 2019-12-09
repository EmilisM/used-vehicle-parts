﻿using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UsedVehicleParts.API.DAL;
using UsedVehicleParts.API.DAL.Entities;

namespace UsedVehicleParts.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<Part> _partRepository;

        private readonly string[] _includeProperties =
        {
            nameof(Part.Buyer), nameof(Part.Image), nameof(Part.PartClass), nameof(Part.Seller),
            nameof(Part.Trim), $"{nameof(Part.Trim)}.{nameof(Part.Trim.Model)}.{nameof(Part.Trim.Model.Make)}"
        };

        public PartController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _partRepository = _unitOfWork.GetRepository<Part>();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Part>>> Get([FromQuery] string name, [FromQuery] int qualityGrade,
            [FromQuery] int[] trimId,
            [FromQuery] int[] partClassId)
        {
            var makes = await _partRepository.Get(
                part =>
                    (string.IsNullOrWhiteSpace(name) ||
                     part.Name != null && part.Name.ToLower().Contains(name.ToLower())) &&
                    (qualityGrade <= 0 || part.QualityGrade >= qualityGrade) &&
                    (trimId.Length <= 0 || trimId.Contains(part.TrimId)) &&
                    (partClassId.Length <= 0 || partClassId.Contains(part.PartClassId)),
                _includeProperties);

            return Ok(makes);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<Part>> Get(int id)
        {
            var row = await _partRepository.GetById(id, _includeProperties);

            return row == null ? (ActionResult<Part>) NotFound() : Ok(row);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Part>> Post([FromBody] Part entity)
        {
            var userId = HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);

            if (userId != null)
            {
                entity.SellerId = int.Parse(userId.Value);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _partRepository.Create(entity);
            await _unitOfWork.Save();

            return Ok(entity);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<Part>> Put(int id, [FromBody] Part entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = await _partRepository.UpdateById(id, entity);

            if (result == null)
            {
                return NotFound();
            }

            await _unitOfWork.Save();

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Part>> Delete(int id)
        {
            var result = await _partRepository.Delete(id);

            if (result == null)
            {
                return NotFound();
            }

            await _unitOfWork.Save();

            return Ok(result);
        }
    }
}