<script>
  
	let name = '';
	let email = '';
	let password = '';


	

  </script>

<svelte:head>
	<title>Login Page</title>
	<meta name="description" content="Login to access your account" />
  </svelte:head>
  
  
  <style>
	.login-form {
	  max-width: 300px;
	  margin: 0 auto;
	  padding: 1rem;
	  border: 1px solid #ccc;
	  border-radius: 4px;
	}
  
	.login-form input {
	  width: 100%;
	  padding: 0.5rem;
	  margin-bottom: 0.5rem;
	}
  
	.login-form button {
	  width: 100%;
	  padding: 0.5rem;
	  background-color: #0070f3;
	  color: white;
	  border: none;
	  border-radius: 4px;
	  cursor: pointer;
	}
  </style>
  
  <div class="login-form">
	<form on:submit={handleSubmit}>
	  <input
		type="text"
		placeholder="닉네임을 입력하여 주십시오."
		bind:value={name}
		required
	  />
	  <input
		type="password"
		placeholder="비밀번호를 입력하여 주십시오."
		bind:value={password}
		required
	  />
	  <button type="submit">Login</button>
	</form>
		<a href="/signup">
			회원가입
		</a>
  </div>

  