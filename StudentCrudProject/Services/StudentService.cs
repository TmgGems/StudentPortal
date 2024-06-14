using Microsoft.AspNetCore.Http.HttpResults;
using StudentCrudProject.Data;
using StudentCrudProject.Models;

namespace StudentCrudProject.Services
{
    public class StudentService : IStudentService
    {
        private readonly ApplicationDbContext _context;

        public StudentService(ApplicationDbContext context)
        {
            _context = context;   
        }
        public List<StudentModel> GetAll()
        {
           var students = _context.Students.ToList();          
            return students;
        }

        public StudentModel GetById(int id)
        {
           var student = _context.Students.Find(id);
           return student;

        }
        public bool Add(StudentModel obj)
        {
            _context.Students.Add(obj);
            _context.SaveChanges();
            return true;
        }
        public void Updates(StudentModel obj)
        {
            _context.Students.Update(obj);
            _context.SaveChanges();
        }

        public int Delete(int id)
        {
            var data = _context.Students.Find(id);
            _context.Students.Remove(data);
            _context.SaveChanges();
            return 1;
        }

        

    }
}
