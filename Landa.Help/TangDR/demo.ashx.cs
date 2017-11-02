using System;
using System.Collections.Generic;
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
            //if (context.Request.RequestType.ToLower() == "post")
            //{

            //}
            //context.Response.ContentType = "application/json";
            //context.Response.Write("Hello World");
            string savedFileName = "";

            foreach (string file in context.Request.Files)
            {
                HttpPostedFile hpf = context.Request.Files[file] as HttpPostedFile;
                if (hpf.ContentLength == 0)
                    continue;
                // savedfilename = context.server.mappath(path.getfilename(hpf.filename));
                // hpf.saveas(savedfilename);
            }
            context.Response.Write(savedFileName);
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