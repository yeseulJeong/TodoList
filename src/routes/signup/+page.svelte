<script>
import bcrypt from 'bcryptjs';
export let form;




let name = 'aaa';
let email = 'aaa@aaa.com';
let password = 'aaa';


</script>

<h2>회원가입</h2>

{#if form?.success}
    <p>회원가입이 완료되었습니다. 로그인해주세요.</p>
    <a href="/login">로그인</a>
{:else}
    <form method="post">
        <input type="text" placeholder="name" bind:value={name} required />
        <input type="email" placeholder="Email" bind:value={email} required />
        <input type="password" placeholder="Password" bind:value={password} required />
        <button type="submit">가입하기</button>
    </form>
{/if}

{#if form?.error}
    <p>{form.error}</p>
{/if}

