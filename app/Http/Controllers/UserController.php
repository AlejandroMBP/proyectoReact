<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::latest()->get();
        return Inertia::render('Usuarios/UsuarioIndex', ['users' => $users]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:225',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|min:6',
        ]);
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        return redirect()->route('usuario.index')->with('success', 'Usuario creado satisfactoriamente');
    }
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($user->id)],
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return redirect()->back()->with('success', 'Usuario actualizado correctamente.');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('usuario.index')->with('success', 'Usiario eliminado.');
    }
}
