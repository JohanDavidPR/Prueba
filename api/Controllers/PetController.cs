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
    public class PetController
    {
        private PetData data = new PetData();

        [HttpGet]
        [Route("pets")]
        public async Task<ActionResult<Response>> Get()
        {
            var list = await data.getPets();
            Response d = new Response("Get user", list);
            return d;
        }

        [HttpGet]
        [Route("pet/{id}")]
        public async Task<ActionResult<Pet?>> Get(int id)
        {
            var pet = await data.getPet(id);
            return pet;
        }

        [HttpPost]
        [Route("pet")]
        public async Task<ActionResult<Response>> CreatePet([FromBody] PetReq pet)
        {
            var result = await data.addPet(pet);
            return result;
        }

        [HttpPut]
        [Route("pet/{id}")]
        public async Task<ActionResult<Response>> UpdatePet(int id, [FromBody] PetReq pet)
        {
            var result = await data.updatePet(id, pet);
            return result;
        }

        [HttpDelete]
        [Route("pet/{id}")]
        public async Task<ActionResult<Response>> deletePet(int id)
        {
            var result = await data.daletePet(id);
            return result;
        }

    }
}
