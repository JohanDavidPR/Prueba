using api.Database;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using api.ModelRequets;
using Microsoft.VisualBasic;
using System.Text.Json;

namespace api.Controllers
{
    [ApiController]
    [AllowAnonymous]
    //[Route("user")]
    public class UserController
    {
        private UserData data = new UserData();
        [HttpGet]
        [Route("users")]
        public async Task <ActionResult<Response>> Get()
        { 
            var listUser = await data.getUsers();
            Response d = new Response("Get user", listUser);
            return d;
        }

        [HttpGet]
        [Route("clients")]
        public async Task<ActionResult<Response>> GetClient()
        {
            var listUser = await data.getClients();
            Response d = new Response("Get user", listUser);
            return d;
        }

        [HttpGet]
        [Route("user/{id}")]
        public async Task <ActionResult<User?>> Get(int id)
        {
            var user = await data.getUser(id);
            return user;
        }

        [HttpPost]
        [Route("authenticate")]
        public async Task <ActionResult<Response>> Verificar([FromBody] LoginBody body)
        {
            if (body == null)
            {
                throw new System.Web.Http.HttpResponseException(HttpStatusCode.BadRequest);
            }

            var user = await data.loginUser(body);

            return user;
        }

        [HttpPost]
        [Route("user")]
        public async Task <ActionResult<Response>> CreateUser([FromBody] User user)
        {
            var result = await data.addUser(user);

            return result;
        }

        [HttpPut]
        [Route("user/{id}")]
        public async Task <ActionResult<Response>> UpdateUser(int id, [FromBody] User user)
        {
            var result = await data.updateUser(id, user);
            return result;
        }

        [HttpDelete]
        [Route("user/{id}")]
        public async Task <ActionResult<Response>> deleteUser(int id)
        {
            var result = await data.deleteUser(id);
            return result;
        }

        /*
         
        public async Task<ActionResult<Response>> UpdateUser(int id, [FromBody] dynamic json)
        {
            Dictionary<string, object> user = JsonSerializer.Deserialize<Dictionary<string, object>>(json);
            var result = await data.updateUser(id, user);

            return result;
        }
         
         */

    }
}
