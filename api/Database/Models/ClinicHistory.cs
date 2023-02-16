namespace api.Models
{
    public class ClinicHistory
    {
        public int Id { get; set; }
        public string date { get; set; }
        public string hour { get; set; }
        public Pet pet { get; set; }
        public List<ClinicalRecord> register { get; set; }
    }
}
