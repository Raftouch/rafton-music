'use client'

export default function LandingPage() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload = {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    }
  }
  return (
    <main>
      <h1 className="mb-20 text-center">Register Form</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col min-w-[50%] bg-white text-rafton-blue mt-20 mb-20 gap-10 p-10 rounded-md"
      >
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="w-full border-2"
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full border-2"
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </main>
  )
}
