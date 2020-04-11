using System;

namespace Domain
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ImageId { get; set; }
        public string ImageUrl { get; set; }
    }
}