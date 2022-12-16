using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Domain2
{
    public class ChatMessage
    {
        public string from_user { get; set; }
        public string to_user { get; set; }
        public DateTime timesend { get; set; }
        public string message { get; set; }
    }
    public class UserClient
    {
        public string user { get; set; }
        public string id { get; set; }
    }
}
