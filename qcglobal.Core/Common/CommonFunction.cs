using System;
using System.Collections.Generic;
using System.Text;
using XSystem.Security.Cryptography;

namespace qcglobal.Core.Common
{
    public static class CommonFunction
    {
        public static string ToMD5(string str)
        {
            string result = "";
            byte[] buffer = Encoding.UTF8.GetBytes(str);
            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            buffer = md5.ComputeHash(buffer);
            for (int i = 0; i < buffer.Length; i++)
            {
                result += buffer[i].ToString("x2");
            }
            return result;
        }
    }
}
