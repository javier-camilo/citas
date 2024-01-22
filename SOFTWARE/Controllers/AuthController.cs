using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SOFTWARE.Contexto;
using SOFTWARE.Core.Dtos;
using SOFTWARE.Core.OtherObjects;
using SOFTWARE.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Diagnostics;

namespace SOFTWARE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        private readonly TodoContext _context;



        public AuthController(UserManager<ApplicationUser> userManager,
                RoleManager<IdentityRole> roleManager, IConfiguration configuration, TodoContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _context = context;
        }


        [HttpPost]
        [Route("seed-roles")]
        public async Task<IActionResult> SeedRoles()
        {

            bool isOwnerRoleExists = await _roleManager.RoleExistsAsync(StaticUserRoles.OWNER);
            bool isAdminRoleExists = await _roleManager.RoleExistsAsync(StaticUserRoles.ADMIN);
            bool isUserRoleExists = await _roleManager.RoleExistsAsync(StaticUserRoles.USER);


            if (isOwnerRoleExists && isAdminRoleExists && isUserRoleExists)
                return Ok("todos los roles estan ya creados");


            await _roleManager.CreateAsync(new IdentityRole(StaticUserRoles.USER));
            await _roleManager.CreateAsync(new IdentityRole(StaticUserRoles.ADMIN));
            await _roleManager.CreateAsync(new IdentityRole(StaticUserRoles.OWNER));

            return Ok("los roles se crearon correctamente");
        }


        private bool ValidarRegistro(string identificacion) {


            var ListadoUsuarios = _context.Users.ToList();
            foreach (var item in ListadoUsuarios)
            {
                if (item.Identificacion.Equals(identificacion)) {
                    return true;
                }

            }
            return false;
        }


        private ValidationProblemDetails error(string servicio, string e) {

            ModelState.AddModelError(servicio, e);
            var problemDetails = new ValidationProblemDetails(ModelState)
            {
                Status = StatusCodes.Status400BadRequest,
            };

            return problemDetails;
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<ApplicationUser>> Register([FromBody] RegisterDto registerDto)
        {
            var isExistsUser = await _userManager.FindByNameAsync(registerDto.UserName);
            if (isExistsUser != null)
                return BadRequest(error("Duplicado", "el usuario ya se encuentra registrado"));

            if (ValidarRegistro(registerDto.Identificacion))
                return BadRequest(error("Duplicado", "los datos del usuario ya se encuentran registrados"));

            ApplicationUser newUser = new ApplicationUser()
            {
                Identificacion = registerDto.Identificacion,
                Nombre = registerDto.Nombre,
                Apellido = registerDto.Apellido,
                PhoneNumber = registerDto.Telefono,
                Email = registerDto.Email,
                UserName = registerDto.UserName,
                SecurityStamp = Guid.NewGuid().ToString(),
            };

            var createUserResult = await _userManager.CreateAsync(newUser, registerDto.Password);

            if (!createUserResult.Succeeded)
            {

                var errorString = "creacion de usuario fallida por: ";
                foreach (var error in createUserResult.Errors)
                {
                    ModelState.AddModelError(errorString, error.Description);
                }

                var problemDetails = new ValidationProblemDetails(ModelState)
                {
                    Status = StatusCodes.Status400BadRequest,
                };

                return BadRequest(problemDetails);
            }

            // Add a Default USER Role to all users
            await _userManager.AddToRoleAsync(newUser, StaticUserRoles.USER);

            return Ok(newUser);
        }


        [HttpGet]
        [Route("traerUsuario/{id}")]
        public async Task<ActionResult<ApplicationUser>> GetUser(string id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }

            ApplicationUser user;
            user = null;

            var listado = await _context.Users.ToListAsync();

            foreach (var item in listado)
            {
                if (item.Identificacion.Equals(id)) {
                    user = item;
                }
            }

            if (user == null) {
                return NotFound();
            }

            return Ok(user);
        }

        // Route -> Login
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<ApplicationUserViewModel>> Login([FromBody] LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);

            if (user is null)
                return Unauthorized("credenciales invalidas");

            var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!isPasswordCorrect)
                return Unauthorized("credenciales invalidas");

            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim("JWTID", Guid.NewGuid().ToString()),
                new Claim("Identificacion",user.Identificacion),
                new Claim("Nombre",user.Nombre),
                new Claim("Apellido",user.Apellido),
                new Claim("Telefono",user.PhoneNumber),
                new Claim("Email",user.Email),
                new Claim("UserName",user.UserName),
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim("rol", userRole));
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var token = GenerateNewJsonWebToken(authClaims);

            return new ApplicationUserViewModel
            {
                result = true,
                UserName = user.UserName,
                Token = token
            };
        }

        private string GenerateNewJsonWebToken(List<Claim> claims)
        {
            var authSecret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var tokenObject = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(1),
                    claims: claims,
                    signingCredentials: new SigningCredentials(authSecret, SecurityAlgorithms.HmacSha256)
                );

            string token = new JwtSecurityTokenHandler().WriteToken(tokenObject);

            return token;
        }


        // Route -> make user -> admin
        [HttpPost]
        [Route("make-admin")]
        public async Task<ActionResult<ApplicationUserViewModel>> MakeAdmin([FromBody] UpdatePermissionDto updatePermissionDto)
        {
            var user = await _userManager.FindByNameAsync(updatePermissionDto.UserName);

            if (user is null)
                return BadRequest("usuario invalido!!!!!!!!");

            await _userManager.AddToRoleAsync(user, StaticUserRoles.ADMIN);

            return new ApplicationUserViewModel
            {
                result = true,
                UserName = user.UserName
            };

        }

        [HttpPost]
        [Route("remove-admin")]
        public async Task<ActionResult<ApplicationUserViewModel>> RemoveAdmin([FromBody] UpdatePermissionDto updatePermissionDto)
        {
            var user = await _userManager.FindByNameAsync(updatePermissionDto.UserName);

            if (user is null)
                return BadRequest("usuario invalido!!!!!!!!");

            await _userManager.RemoveFromRoleAsync(user, StaticUserRoles.ADMIN);

            return new ApplicationUserViewModel
            {
                result = true,
                UserName = user.UserName
            };

        }


        // Route -> make user -> owner
        [HttpPost]
        [Route("make-owner")]
        public async Task<ActionResult<ApplicationUserViewModel>> MakeOwner([FromBody] UpdatePermissionDto updatePermissionDto)
        {
            var user = await _userManager.FindByNameAsync(updatePermissionDto.UserName);

            if (user is null)
                return BadRequest("usuario invalido!!!!!!!!!");

            await _userManager.AddToRoleAsync(user, StaticUserRoles.OWNER);

            return new ApplicationUserViewModel
            {
                result = true,
                UserName = user.UserName
            };

        }

        [HttpPost]
        [Route("remove-owner")]
        public async Task<ActionResult<ApplicationUserViewModel>> RemoveOwner([FromBody] UpdatePermissionDto updatePermissionDto)
        {
            var user = await _userManager.FindByNameAsync(updatePermissionDto.UserName);

            if (user is null)
                return BadRequest("usuario invalido!!!!!!!!!");

            await _userManager.RemoveFromRoleAsync(user, StaticUserRoles.OWNER);

            return new ApplicationUserViewModel
            {
                result = true,
                UserName = user.UserName
            };

        }

        [HttpGet]
        [Route("Listado-usuarios")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetMotivo()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            return await _context.Users.ToListAsync();
        }





    }
}