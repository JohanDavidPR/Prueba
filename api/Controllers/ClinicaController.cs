using api.Database;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using api.ModelRequets;
using api.Database.DataModels;

namespace api.Controllers
{
    [ApiController]
    [AllowAnonymous]
    public class ClinicaController
    {
        private Clinical data = new Clinical();

        [HttpGet]
        [Route("clinicalhistories")]
        public async Task<ActionResult<Response>> Get()
        {
            var list = await data.GetClinicalHistores();
            Response d = new Response("Get user", list);
            return d;
        }

        [HttpGet]
        [Route("clinical/{id}")]
        public async Task<ActionResult<ClinicHistory?>> Get(int id)
        {
            var clinical = await data.GetClinicalHistory(id);
            return clinical;
        }

        [HttpGet]
        [Route("record/{id}")]
        public async Task<ActionResult<ClinicalRecord?>> GetRecord(int id)
        {
            var clinical = await data.GetClinicalRecord(id);
            return clinical;
        }

        [HttpPost]
        [Route("clincal")]
        public async Task<ActionResult<Response>> CreateClinical([FromBody] ClinicalRecordReq dat)
        {
            var result = await data.addClinicalRecord(dat);
            return result;
        }

        /*[HttpPost]
        [Route("testruta")]
        public async Task<ActionResult<Response>> Create([FromBody] ClinicHistoryReq dat)
        {
            var result = await data.addClinicalHistory(dat.pet);
            return result;
        }*/
    }
}
