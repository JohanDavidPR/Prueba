using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class User
    {
        public int identification_number { get; set; }
        public string name { get; set; }
        public string last_name { get; set; }
        public string gender { get; set; }
        public Rol? rol { get; set; }
    }
}
