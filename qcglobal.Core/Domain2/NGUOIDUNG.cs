using qcglobal.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace qcglobal.Core.Domain2
{
    public class NGUOIDUNG
    {
        public long id { get; set; }
        public string sodt { get; set; }
        public string email { get; set; }
        public string token { get; set; }
        public bool active { get; set; }
        public bool isadmin { get; set; }
    }
    public class resultobj
    {
        public string ketqua { get; set; }
        public string errorstr { get; set; }
        public Object? data { get; set; }
    }
}
