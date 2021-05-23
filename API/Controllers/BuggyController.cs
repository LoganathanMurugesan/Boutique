using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly StoreContext _context;

        public BuggyController(StoreContext context)
        {
            _context = context;
        }


        [HttpGet("testauth")]
        [Authorize]
        public ActionResult<string> GetSecretText()
        {
            return "secret stuff";
        }

        [HttpGet("notfound")]
        public ActionResult GetNotFoundRequest()
        {
            var result = _context.Products.Find(100);
            if(result == null)
            {
                return NotFound(new ApiResponse(404));
            }
            return Ok();
        }

          [HttpGet("servererror")]
        public ActionResult GetServerError()
        {
            var result = _context.Products.Find(100);
            var stringResult = result.ToString();
            return Ok();
        }

          [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ApiResponse(400));
        }

          [HttpGet("badrequest/{id}")]
        public ActionResult GetBadRequestErrorById(int id)
        {
            return Ok();
        }
    }
}