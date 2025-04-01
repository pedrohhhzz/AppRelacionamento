import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const SignUpForm = () => {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [genderPreference, setGenderPreference] = useState("");




  const { signup, loading }  = useAuthStore()


  
  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        signup({ name, email, password, gender, age, genderPreference });
      }}
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome
        </label>
        <div className="mt-1">
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)} 
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
            placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
    Email
  </label>
  <div className="mt-1">
    <input
      id="email"
      name="email"
      type="email"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
      placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
    />
  </div>
</div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Senha
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
            placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
          Idade
        </label>
        <div className="mt-1">
          <input
            id="age"
            name="age"
            type="number"
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min={18} // idade mínima
            max={120} // idade máxima
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
            placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Seu Gênero</label>
        <div className="mt-2 flex gap-2">
          <div className="flex items-center">
            <input 
              id="male"
              name="gender"
              type="checkbox"
              checked={gender === "male"}
              onChange={() => setGender("male")}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
            />
            <label htmlFor="male" className="ml-2 block text-sm text-gray-900">Masculino</label>
          </div>
          <div className="flex items-center">
            <input 
              id="female"
              name="gender"
              type="checkbox"
              checked={gender === "female"}
              onChange={() => setGender("female")}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
            />
            <label htmlFor="female" className="ml-2 block text-sm text-gray-900">Feminino</label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Preferência</label>
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <input
              id="prefer-male"
              name="gender-preference"
              type="radio"
              value="male"
              checked={genderPreference === "male"}
              onChange={(e) => setGenderPreference(e.target.value)}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
            />
            <label htmlFor="prefer-male" className="ml-2 block text-sm text-gray-900">Homem</label>
          </div>

          <div className="flex items-center">
            <input
              id="prefer-female"
              name="gender-preference"
              type="radio"
              value="female"
              checked={genderPreference === "female"}
              onChange={(e) => setGenderPreference(e.target.value)}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
            />
            <label htmlFor="prefer-female" className="ml-2 block text-sm text-gray-900">Mulher</label>
          </div>

          <div className="flex items-center">
            <input
              id="prefer-both"
              name="gender-preference"
              type="radio"
              value="both"
              checked={genderPreference === "both"}
              onChange={(e) => setGenderPreference(e.target.value)}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
            />
            <label htmlFor="prefer-both" className="ml-2 block text-sm text-gray-900">Ambos</label>
          </div>
        </div>
      </div>



      <div>
  <button
    type="submit"
    className={`w-full flex justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-sm
      font-medium text-white ${
        loading
          ? "bg-pink-400 cursor-not-allowed"
          : "bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
      }`}
    disabled={loading}
  >
    {loading ? "Signing up..." : "Inscrever-se"}
  </button>
</div>

    </form>
  );
};

export default SignUpForm;