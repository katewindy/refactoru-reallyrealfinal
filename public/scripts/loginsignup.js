$(document).on('ready', function(){
	$(document).on('click', '#changetosignin', function(){
		var signin = $('.signinform');
		console.log(signin);
		signin.empty();
		signin.append('<p><strong>Sign up!</strong><small>&nbsp;&nbsp;Already a member? <a href="/" class="switchback">Sign in instead.</a></small><form action="/auth/signup" method="post"><input class="inputfield" type="text" name="username" placeholder="Username"><input class="inputfield" type="text" name="email" placeholder="email"><input class="inputfield" type="password" name="password" placeholder="Password"><input class="btn btn-primary" type="submit">');
	});
});