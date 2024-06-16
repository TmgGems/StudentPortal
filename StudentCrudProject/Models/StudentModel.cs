using System.ComponentModel.DataAnnotations;

namespace StudentCrudProject.Models
{
    public class StudentModel
    {
        [Key]
        public int Id { get; set; }

        [Display(Name ="First Name")]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Display (Name ="Last Name")]
        [StringLength(50)]
        public string  LastName {  get; set; }

        [StringLength(50)]
        public string Faculty {  get; set; }

        [Display(Name ="Date Of Birth")]
        public DateTime DOB {  get; set; }
        [EmailAddress]
        [StringLength(50)]
        public string Email {  get; set; }

        [StringLength(10)]
        public string Gender { get; set; }
    }
}
