using StudentCrudProject.Models;

namespace StudentCrudProject.Services
{
    public interface IStudentService
    {
        List<StudentModel> GetAll();

        StudentModel GetById(int id);

        bool Add(StudentModel obj);

        void Updates(StudentModel obj);

        int Delete(int obj);

    }
}
