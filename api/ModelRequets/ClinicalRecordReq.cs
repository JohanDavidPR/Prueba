namespace api.ModelRequets
{
    public class ClinicalRecordReq
    {
        public float temperature { get; set; }
        public string heart_rate { get; set; }
        public float weight { get; set; }
        public string observation { get; set; }
        public string date { get; set; }
        public string hour { get; set; }
        public int employee { get; set; }
        public int clinic_history { get; set; }
    }
}
