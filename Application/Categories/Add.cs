using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Persistence;

namespace Application.Categories
{
    public class Add
    {
        public class Command : IRequest
        {
            public IFormFile File { get; set; }
            public string Model { get; set; }
        }

        public class FormModel{
            public string Name { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => JsonConvert.DeserializeObject<FormModel>(x.Model).Name).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var entity = JsonConvert.DeserializeObject<FormModel>(request.Model);

                if (await _context.Categories.Where(x => x.Name == entity.Name).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new { CategoryName = "This category already exists" });

                var catPhotoUploadResult = _photoAccessor.AddCategoryPhoto(request.File);

                var category = new Category
                {
                    Id = Guid.NewGuid(),
                    Name = entity.Name,
                    ImageUrl = catPhotoUploadResult.Url,
                    ImageId = catPhotoUploadResult.PublicId,
                };

                _context.Categories.Add(category);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}