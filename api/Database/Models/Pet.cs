namespace api.Models
{
    public class Pet
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string sex { get; set; }
        public string race { get; set;}
        public User client { get; set; }
    }
}
