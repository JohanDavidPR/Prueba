using api.ModelRequets;
using api.Models;
using Npgsql;
using System.Data;

namespace api.Database.DataModels
{
    public class PetData
    {
        private Connection cn = new Connection();

        public async Task <List<Pet>> getPets()
        {
            var list = new List<Pet>();
            string query = "select * from pet;";

            cn.Conectar();

            using (var conector = new NpgsqlCommand(query, cn.Conn))
            {
                using (NpgsqlDataReader item = await conector.ExecuteReaderAsync())
                {
                    while (await item.ReadAsync())
                    {
                        var dato = new Pet();
                        dato.Id = item.GetInt32("id");
                        dato.name = item.GetString("name");
                        dato.sex = item.GetString("sex");
                        dato.race = item.GetString("race");
                        list.Add(dato);
                    }
                }
                cn.Desconected();
            }

            return list;
        }

        public async Task<Pet?> getPet(int id)
        {
            Pet? pet = null;
            string query = "select u.*, p.id, p.name as namepet, p.race, p.sex from pet p join users u on p.user_id = u.identification_number where id = @id;";

            cn.Conectar();

            using (var conector = new NpgsqlCommand(query, cn.Conn))
            {
                conector.Parameters.AddWithValue("id", id);
                using (NpgsqlDataReader item = await conector.ExecuteReaderAsync())
                {
                    if (item.HasRows)
                    {
                        await item.ReadAsync();
                        pet = new Pet();
                        pet.Id = item.GetInt32("id");
                        pet.name = item.GetString("namepet");
                        pet.sex = item.GetString("sex");
                        pet.race = item.GetString("race");
                        pet.client = new User();
                        pet.client.identification_number = item.GetInt32("identification_number");
                        pet.client.name = item.GetString("name");
                        pet.client.last_name = item.GetString("last_name");
                        pet.client.gender = item.GetString("gender");
                        pet.client.rol = new Rol();
                        pet.client.rol.Id = item.GetInt32("rol_id");
                        //pet.client.rol.rol = item.GetString("rol");
                    }
                }
                cn.Desconected();
            }

            return pet;
        }

        public async Task <Response> addPet(PetReq data)
        {
            var clinical = new Clinical();
            Pet? pet = null;
            try
            {
                string query = "insert into pet (name, sex, race, user_id) " +
                "values (@name, @sex, @race, @id_user);";

                cn.Conectar();
                using (var conector = new NpgsqlCommand(query, cn.Conn))
                {
                    conector.Parameters.AddWithValue("name", data.name);
                    conector.Parameters.AddWithValue("sex", data.sex);
                    conector.Parameters.AddWithValue("race", data.race);
                    conector.Parameters.AddWithValue("id_user", data.client);
                    
                    await conector.ExecuteNonQueryAsync();
                }
                cn.Desconected();
                
                cn.Conectar();
                query = "select * from pet p order by p.id  desc FETCH FIRST 1 ROWS only;";
                using (var conector = new NpgsqlCommand(query, cn.Conn))
                {
                    using (NpgsqlDataReader item = await conector.ExecuteReaderAsync())
                    {
                        if (item.HasRows)
                        {
                            await item.ReadAsync();
                            pet = new Pet();
                            pet.Id = item.GetInt32("id");
                            pet.name = item.GetString("name");
                            pet.sex = item.GetString("sex");
                            pet.race = item.GetString("race");
                        }
                    }
                    cn.Desconected();
                }
                if (pet != null)
                    return await clinical.addClinicalHistory(pet.Id);

                return new Response("Succes", pet);
            }
            catch (Exception ex)
            {
                return new Response("error", "");
            }
        }

        public async Task<Response> updatePet(int id, PetReq data)
        {
            try
            {
                Pet? pet = null;
                string query = "update pet set name = @name, sex = @sex, race = @race " +
                "where id = @id;";

                cn.Conectar();
                using (var conector = new NpgsqlCommand(query, cn.Conn))
                {
                    conector.Parameters.AddWithValue("id", id);
                    conector.Parameters.AddWithValue("name", data.name);
                    conector.Parameters.AddWithValue("sex", data.sex);
                    conector.Parameters.AddWithValue("race", data.race);
                    using (NpgsqlDataReader item = await conector.ExecuteReaderAsync())
                    {
                        if (item.HasRows)
                        {
                            await item.ReadAsync();
                            pet = new Pet();
                            pet.Id = item.GetInt32("id");
                            pet.name = item.GetString("name");
                            pet.sex = item.GetString("sex");
                            pet.race = item.GetString("race");
                        }
                    }
                }
                cn.Desconected();
                return new Response("Succes", pet);
            }
            catch (Exception ex)
            {
                return new Response("error", "");
            }
        }

        public async Task<Response> daletePet(int id)
        {
            try
            {
                string query = "delete from pet where id = @id;";

                cn.Conectar();
                using (var conector = new NpgsqlCommand(query, cn.Conn))
                {
                    conector.Parameters.AddWithValue("id", id);
                    await conector.ExecuteNonQueryAsync();
                }
                cn.Desconected();
                return new Response("Succes", "");
            }
            catch (Exception ex)
            {
                return new Response("error", "");
            }
        }

    }
}
