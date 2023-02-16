using api.ModelRequets;
using api.Models;
using Npgsql;
using System.Data;

namespace api.Database.DataModels
{
    public class Clinical
    {
        private Connection cn = new Connection();

        public async Task <List<ClinicHistory>> GetClinicalHistores()
        {
            var list = new List<ClinicHistory>();
            string query = "select * from users u join (select ch.*,  p.name as namepet, p.race, p.sex, p.user_id from clinic_history ch join pet p on ch.pet_id = p.id ) as ch on ch.user_id = u.identification_number;";

            cn.Conectar();

            using (var conector = new NpgsqlCommand(query, cn.Conn))
            {
                using (NpgsqlDataReader item = await conector.ExecuteReaderAsync())
                {
                    while (await item.ReadAsync())
                    {
                        var ch = new ClinicHistory();
                        ch.Id = item.GetInt32("id");
                        ch.date = item.GetDateTime("date").ToString();
                        //ch.hour = item.GetString("hour");
                        ch.pet = new Pet();
                        ch.pet.Id = item.GetInt32("pet_id");
                        ch.pet.name = item.GetString("namepet");
                        ch.pet.sex = item.GetString("sex");
                        ch.pet.race = item.GetString("race");
                        ch.pet.client = new User();
                        ch.pet.client.identification_number = item.GetInt32("identification_number");
                        ch.pet.client.name = item.GetString("name");
                        ch.pet.client.last_name = item.GetString("last_name");
                        ch.pet.client.gender = item.GetString("gender");
                        ch.pet.client.rol = new Rol();
                        ch.pet.client.rol.Id = item.GetInt32("rol_id");
                        list.Add(ch);
                    }
                }
                cn.Desconected();
            }

            return list;
        }

        public async Task<ClinicHistory?> GetClinicalHistory(int id)
        {
            ClinicHistory? ch = null;
            string query = "select * from users u join (select ch.*,  p.name as namepet, p.race, p.sex, p.user_id from clinic_history ch join pet p on ch.pet_id = p.id ) as ch on ch.user_id = u.identification_number where ch.pet_id = @id;";

            cn.Conectar();

            using (var conector = new NpgsqlCommand(query, cn.Conn))
            {
                conector.Parameters.AddWithValue("id", id);
                using (NpgsqlDataReader item = await conector.ExecuteReaderAsync())
                {
                    if (item.HasRows)
                    {
                        await item.ReadAsync();
                        ch = new ClinicHistory();
                        ch.Id = item.GetInt32("id");
                        ch.date = item.GetDateTime("date").ToString();
                        //ch.hour = item.GetString("hour");
                        ch.pet = new Pet();
                        ch.pet.Id = item.GetInt32("pet_id");
                        ch.pet.name = item.GetString("namepet");
                        ch.pet.sex = item.GetString("sex");
                        ch.pet.race = item.GetString("race");
                        ch.pet.client = new User();
                        ch.pet.client.identification_number = item.GetInt32("identification_number");
                        ch.pet.client.name = item.GetString("name");
                        ch.pet.client.last_name = item.GetString("last_name");
                        ch.pet.client.gender = item.GetString("gender");
                        ch.pet.client.rol = new Rol();
                        ch.pet.client.rol.Id = item.GetInt32("rol_id");
                    }
                }
                cn.Desconected();
                if( ch != null)
                {
                    ch.register = new List<ClinicalRecord>();
                    ch.register = await GetClinicalRecords(ch.Id);
                }
            }

            return ch;
        }

        public async Task <List<ClinicalRecord>> GetClinicalRecords(int ch_id)
        {
            var list = new List<ClinicalRecord>();

            string query = "select r.rol, cr.* " +
                "from rol r, " +
                "(select * from clinical_record cr join users u  on cr.employee_id  = u.identification_number) as cr" +
                " where cr.clinic_history_id  = @id and cr.rol_id = r.id;";

            cn.Conectar();

            using (var conector = new NpgsqlCommand(query, cn.Conn))
            {
                conector.Parameters.AddWithValue("id", ch_id);
                using (NpgsqlDataReader item = await conector.ExecuteReaderAsync())
                {
                    while (await item.ReadAsync())
                    {
                        var ch = new ClinicalRecord();
                        ch.Id = item.GetInt32("id");
                        ch.temperature = (float)item.GetDouble("temperature");
                        ch.weight = (float)item.GetDouble("weight");
                        ch.heart_rate = item.GetString("heart_rate");
                        ch.observation = item.GetString("observation");
                        ch.date = item.GetDateTime("date").ToString();
                        //ch.hour = item.GetString("hour");
                        ch.employee = new User();
                        ch.employee.identification_number = item.GetInt32("identification_number");
                        ch.employee.name = item.GetString("name");
                        ch.employee.last_name = item.GetString("last_name");
                        ch.employee.gender = item.GetString("gender");
                        ch.employee.rol = new Rol();
                        ch.employee.rol.Id = item.GetInt32("rol_id");
                        ch.employee.rol.rol = item.GetString("rol");
                        list.Add(ch);
                    }
                }
                cn.Desconected();
            }

            return list;
        }

        public async Task<ClinicalRecord?> GetClinicalRecord(int ch_id)
        {
            ClinicalRecord? ch = null;

            string query = "select r.rol, cr.* " +
                "from rol r, " +
                "(select * from clinical_record cr join users u  on cr.employee_id  = u.identification_number) as cr" +
                " where cr.id = @id and cr.rol_id = r.id;";

            cn.Conectar();

            using (var conector = new NpgsqlCommand(query, cn.Conn))
            {
                conector.Parameters.AddWithValue("id", ch_id);
                using (NpgsqlDataReader item = await conector.ExecuteReaderAsync())
                {
                    if (item.HasRows)
                    {
                        await item.ReadAsync();
                        ch = new ClinicalRecord();
                        ch.Id = item.GetInt32("id");
                        ch.temperature = (float)item.GetDouble("temperature");
                        ch.weight = (float)item.GetDouble("weight");
                        ch.heart_rate = item.GetString("heart_rate");
                        ch.observation = item.GetString("observation");
                        ch.date = item.GetDateTime("date").ToString();
                        //ch.hour = item.GetString("hour");
                        ch.employee = new User();
                        ch.employee.identification_number = item.GetInt32("identification_number");
                        ch.employee.name = item.GetString("name");
                        ch.employee.last_name = item.GetString("last_name");
                        ch.employee.gender = item.GetString("gender");
                        ch.employee.rol = new Rol();
                        ch.employee.rol.Id = item.GetInt32("rol_id");
                        ch.employee.rol.rol = item.GetString("rol");
                    }
                }
                cn.Desconected();
            }

            return ch;
        }

        public async Task <Response> addClinicalHistory(int pet)
        {
            try
            {
                string hora = DateTime.Now.ToString("hh:mm");
                string fecha = DateTime.UtcNow.ToString("yyyy-MM-dd");
                string query = "insert into clinic_history (date, hour, pet_id) " +
                "values (@date, @hour, @pet)";

                cn.Conectar();
                using (var conector = new NpgsqlCommand(query, cn.Conn))
                {
                    conector.Parameters.AddWithValue("date", fecha);
                    conector.Parameters.AddWithValue("hour", hora);
                    conector.Parameters.AddWithValue("pet", pet);
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

        public async Task <Response> addClinicalRecord(ClinicalRecordReq cr)
        {
            try
            {
                string hora = DateTime.Now.ToString("hh:mm");
                string fecha = DateTime.UtcNow.ToString("yyyy-MM-dd");
                string query = "insert into clinical_record (temperature, heart_rate, weight, observation, date, hour, employee_id, clinic_history_id) " +
                "values (@temperature, @heart_rate, @weight, @observation, @date, @hour, @employee, @clinic_history);";

                cn.Conectar();
                using (var conector = new NpgsqlCommand(query, cn.Conn))
                {
                    conector.Parameters.AddWithValue("temperature", cr.temperature);
                    conector.Parameters.AddWithValue("heart_rate", cr.heart_rate);
                    conector.Parameters.AddWithValue("weight", cr.weight);
                    conector.Parameters.AddWithValue("observation", cr.observation);
                    conector.Parameters.AddWithValue("date", fecha);
                    conector.Parameters.AddWithValue("hour", hora);
                    conector.Parameters.AddWithValue("employee", cr.employee);
                    conector.Parameters.AddWithValue("clinic_history", cr.clinic_history);
                    await conector.ExecuteNonQueryAsync();
                }
                cn.Desconected();
                return new Response("Succes", "");
            }
            catch (Exception ex)
            {
                return new Response("error", cr);
            }
        }

    }
}
