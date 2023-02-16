using api.Database;
using api.ModelRequets;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Npgsql;
using System.Data;
using System.Data.SqlClient;

namespace api.Database
{
    public class UserData
    {
        private Connection cn = new Connection();
        public async Task <List<User>> getUsers()
        {
            var list = new List<User>();
            string query = "select * from users u join rol r on u.rol_id  = r.id;";

            cn.Conectar();

            using (var conector = new NpgsqlCommand(query, cn.Conn))
            {
                using(NpgsqlDataReader item = await conector.ExecuteReaderAsync())
                {
                    while (await item.ReadAsync())
                    {
                        var user = new User();
                        user.identification_number = item.GetInt32("identification_number");
                        user.name = item.GetString("name");
                        user.last_name = item.GetString("last_name");
                        user.gender = item.GetString("gender");
                        user.rol = new Rol();
                        user.rol.Id = item.GetInt32("rol_id");
                        user.rol.rol = item.GetString("rol");
                        list.Add(user);
                    }
                }
                cn.Desconected();
            }

            return list;
        }

        public async Task <User?> getUser(int id)
        {
            User? user = null;
            string query = "select * from users u join rol r on u.rol_id  = r.id where u.identification_number = @id;";

            cn.Conectar();

            using (var conector = new NpgsqlCommand(query, cn.Conn))
            {
                conector.Parameters.AddWithValue("id", id);

                using (NpgsqlDataReader item = await conector.ExecuteReaderAsync())
                {
                    if(item.HasRows)
                    {
                        await item.ReadAsync();
                        user = new User();
                        user.identification_number = item.GetInt32("identification_number");
                        user.name = item.GetString("name");
                        user.last_name = item.GetString("last_name");
                        user.gender = item.GetString("gender");
                        user.rol = new Rol();
                        user.rol.Id = item.GetInt32("rol_id");
                        user.rol.rol = item.GetString("rol");
                    }
                }
                cn.Desconected();
            }
            return user;
        }

        public async Task <Response> loginUser(LoginBody data)
        {
            try
            {
                User? user = null;

                string query = "select u.*, c.password  from credentials c," +
                    "(select * from users u join rol r on u.rol_id = r.id) as u" +
                    " where u.identification_number = @id and c.identification_number = u.identification_number;";

                cn.Conectar();

                using (var conector = new NpgsqlCommand(query, cn.Conn))
                {
                    conector.Parameters.AddWithValue("id", data.identification_number);

                    using (NpgsqlDataReader item = await conector.ExecuteReaderAsync())
                    {
                        if (item.HasRows)
                        {
                            await item.ReadAsync();
                            bool verified = BCrypt.Net.BCrypt.Verify(data.password, item.GetString("password"));
                            if (verified)
                            {
                                user = new User();
                                user.identification_number = item.GetInt32("identification_number");
                                user.name = item.GetString("name");
                                user.last_name = item.GetString("last_name");
                                user.gender = item.GetString("gender");
                                user.rol = new Rol();
                                user.rol.Id = item.GetInt32("rol_id");
                                user.rol.rol = item.GetString("rol");
                            }
                        }
                    }
                    cn.Desconected();
                }

                if(user != null)
                {
                    return new Response("Secces", user);
                }
                return new Response("Not found", user);

            }
            catch (Exception ex)
            {
                return new Response("error", "");
            }
        }

        public async Task <Response> addUser(User user)
        {
            string query = "insert into users (identification_number, name, last_name, gender, rol) " + 
                "values (@id, @name, @l_name, @gender, @rol)";

            cn.Conectar();

            try
            {
                await using (var conector = new NpgsqlCommand(query, cn.Conn))
                {
                    conector.Parameters.AddWithValue("id", user.identification_number);
                    conector.Parameters.AddWithValue("name", user.name);
                    conector.Parameters.AddWithValue("l_name", user.last_name);
                    conector.Parameters.AddWithValue("gender", user.gender);
                    conector.Parameters.AddWithValue("rol", 3);
                    await conector.ExecuteReaderAsync();
                }
                cn.Desconected();
            }
            catch (Exception ex)
            {
                return new Response("error", ex.Message);
            }

            return new Response("Succes", "");
        }

        public async Task <Response> updateUser(int id, User data)
        {
            try
            {
                User? user = null;
                string query = "update users set name = @name, last_name = @l_name, gender = @gender " +
                "where identification_number = @id";

                cn.Conectar();
                using (var conector = new NpgsqlCommand(query, cn.Conn))
                {
                    conector.Parameters.AddWithValue("id", id);
                    conector.Parameters.AddWithValue("name", data.name);
                    conector.Parameters.AddWithValue("l_name", data.last_name);
                    conector.Parameters.AddWithValue("gender", data.gender);

                    using (NpgsqlDataReader item = await conector.ExecuteReaderAsync())
                    {
                        if (item.HasRows)
                        {
                            await item.ReadAsync();
                            user = new User();
                            user.identification_number = item.GetInt32("identification_number");
                            user.name = item.GetString("name");
                            user.last_name = item.GetString("last_name");
                            user.gender = item.GetString("gender");
                            user.rol = new Rol();
                            user.rol.Id = item.GetInt32("rol_id");
                            user.rol.rol = item.GetString("rol");
                        }
                    }
                    cn.Desconected();
                }

                return new Response("Succes", user);
            }
            catch (Exception ex)
            {
                return new Response("error", ex.Message);
            }
        }

        public async Task <Response> deleteUser(int id)
        {
            try
            {
                string query = "delete from users where identification_number = (@id);";

                cn.Conectar();

                await using (var conector = new NpgsqlCommand(query, cn.Conn))
                {
                    conector.Parameters.AddWithValue("id", id);
                    await conector.ExecuteReaderAsync();
                }
                cn.Desconected();

                return new Response("Succes", "");

            }
            catch (Exception ex)
            {
                return new Response("error", ex.Message);
            }
        }

        public async Task <Response> addCredencial(LoginBody body)
        {
            try
            {
                string query = "insert into credentials (identification_number, password) " +
                "values (@id, @pass);";

                cn.Conectar();

                using (var conector = new NpgsqlCommand(query, cn.Conn))
                {
                    conector.Parameters.AddWithValue("id", body.identification_number);
                    string passwordHash = BCrypt.Net.BCrypt.HashPassword(body.password, 12);
                    conector.Parameters.AddWithValue("pass", passwordHash);
                    await conector.ExecuteNonQueryAsync();
                }
                cn.Desconected();
                return new Response("Succes", "");
            }
            catch (Exception ex)
            {
                return new Response("error", ex.Message);
            }
        }

    }
}
