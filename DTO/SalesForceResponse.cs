using System.Collections.Generic;
using System.Runtime.Serialization;
using Newtonsoft.Json;

[DataContract]
public class SalesForceResponse<T>
{

    [DataMember(Name = "size")]
    [JsonProperty(PropertyName = "size")]
    public int Count { get; set; }
    [DataMember(Name = "records")]
    [JsonProperty(PropertyName = "records")]
    public IEnumerable<T> Records { get; set; }
    [DataMember(Name = "total_count")]
    [JsonProperty(PropertyName = "total_count")]
    public int TotalSize { get; set; }

}