namespace api.Models
{
    public class ClinicalRecord
    {
        public int Id { get; set; }
        public float temperature { get; set; }
        public string heart_rate { get; set; }
        public float weight { get; set; }
        public string observation { get; set; }
        public string date { get; set; }
        public string hour { get; set; }
        public User employee { get; set; }
    }
}
