using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentCrudProject.Data;
using StudentCrudProject.Models;
using StudentCrudProject.Services;

namespace StudentCrudProject.Controllers.API
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StudentAPIController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private IStudentService _studentService;

        public StudentAPIController(ApplicationDbContext context,IStudentService service)
        {
            _context = context;
            _studentService = service;
        }

        [HttpGet]

        public IActionResult GetStudents()
        {
            List<StudentModel> students = _studentService.GetAll();
            if(students == null)
            {
                return NotFound();  
            }
            return Ok(students);
        }

        [HttpGet("{id}")]
        public StudentModel GetStudentById(int id)
        {
            var student = _studentService.GetById(id);
            return student;
        }

        [HttpPost]

        public bool Add(StudentModel obj)
        {
            return (_studentService.Add(obj));
        }

        [HttpPut]

        public void Update(StudentModel obj)
        {
            
            _studentService.Updates(obj);
        }

        [HttpDelete]

        public int Delete(int id)
        {
            _studentService.Delete(id);
            return id;
        }
    }
}
