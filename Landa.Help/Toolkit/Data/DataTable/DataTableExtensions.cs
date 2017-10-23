using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Collections;
using System.Text.RegularExpressions;
using System.Web.Script.Serialization;

namespace Toolkit
{
    public static class DataTableExtensions
    {
        /// <summary>
        /// 序列号DataTable
        /// </summary>
        /// <param name="table"></param>
        /// <returns></returns>
        public static string DataTableToJson(this DataTable table)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            jsSerializer.MaxJsonLength = int.MaxValue;
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            foreach (DataRow row in table.Rows)
            {
                childRow = new Dictionary<string, object>();
                foreach (DataColumn col in table.Columns)
                {
                    childRow.Add(col.ColumnName, row[col]);
                }
                parentRow.Add(childRow);
            }
            return jsSerializer.Serialize(parentRow);
        }

        /// <summary>
        /// 创建简单的dataTable
        /// </summary>
        /// <param name="columnNameArray"></param>
        /// <returns></returns>
        public static DataTable CreateEasyTable(params string[] columnNameArray)
        {
            DataTable dt = new DataTable();
            if (columnNameArray.Length > 0)
                foreach (var it in columnNameArray)
                {
                    dt.Columns.Add(new DataColumn(it));
                }
            return dt;
        }

        /// <summary>
        /// 添加DataRow
        /// </summary>
        /// <param name="columnNameArray"></param>
        /// <returns></returns>
        public static DataTable AddRow(this DataTable dt, params Object[] rowValues)
        {
            var row = dt.NewRow();
            int i = 0;
            if (rowValues.Length > 0)
            {
                foreach (var it in rowValues)
                {
                    row[i] = it;
                    ++i;
                }
            }
            dt.Rows.Add(row);
            return dt;
        }
    }
}
