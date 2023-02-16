namespace api.ModelRequets
{
    public class Response
    {
        public string msg { get;set; }
        public object? data { get;set; }

        public Response(string msg, object? data)
        {
            this.msg = msg;
            this.data = data;
        }
    }
}
