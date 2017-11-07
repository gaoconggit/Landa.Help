using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace TangDR
{
    /// <summary>
    /// demo 的摘要说明
    /// </summary>
    public class demo : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {


            StreamReader test = new StreamReader(HttpContext.Current.Server.MapPath("/test.json"));
            context.Response.Write(test.ReadToEnd());
            context.Response.ContentType = "application/json";
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}