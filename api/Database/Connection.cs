using Npgsql;

namespace api.Database
{
    public class Connection
    {
        private static string connectionString = new ConfigurationBuilder().SetBasePath(
                Directory.GetCurrentDirectory()
            ).AddJsonFile(
                "appsettings.json"
            ).Build().GetSection("ConnectionStrings:PostgresSQLConnection").Value;

        private NpgsqlConnection conn = new NpgsqlConnection(connectionString);

        public NpgsqlConnection Conn
        {
            get
            {
                return conn;
            }
        }
        public bool Conectar()
        {
            try
            {
                conn.Open();
                return true;
            }
            catch
            {
                return false;
            }

        }

        public void Desconected()
        {
            conn.Close();
        }
    }
}
