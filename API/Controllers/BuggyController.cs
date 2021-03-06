using System;
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
    public ActionResult GetNotFoundResult()
    {
      var thing = _context.Products.Find(42);
      if (thing == null)
      {
        return NotFound(new ApiResponse(404));
      }
      return Ok();
    }

    [HttpGet("servererror")]
    public ActionResult GetServerError()
    {
      Console.WriteLine("Hit");
      var zero = 0;
      var thing = 42 / zero;
      var thingToReturn = thing.ToString();
      return Ok();
    }

    [HttpGet("badrequest")]
    public ActionResult GetBadRequest()
    {
      return BadRequest(new ApiResponse(400));
    }

    [HttpGet("badrequest/{id}")]
    public ActionResult GetNotFoundResult(int id)
    {
      return Ok();
    }
    [HttpGet("maths")]
    public ActionResult GetMathserror()
    {
      var i = 0;
      return Ok(45 / i);
    }
  }
}