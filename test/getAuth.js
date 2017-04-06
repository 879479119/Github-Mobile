fetch("/api/users/getById",{
	method:"POST",
	credentials: 'include',
	body:'id=12726506',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
})

fetch("/api/auth/repos/getAll",{
	method:"POST",
	credentials: 'include'
})