using System;

namespace Application.Categories
{
    public class CategoryDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ImageId { get; set; }
        public string ImageUrl { get; set; }
    }
}