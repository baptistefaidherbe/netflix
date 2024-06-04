import { NextRequest, NextResponse } from 'next/server';
import { dbConnect, dbDisconnect } from '@/lib/database';
import { hashPassword } from '@/helpers/password';
import UserModel from '@/models/users-schema';

const emailPattern =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function isValidEmail(email: string) {
  return emailPattern.test(email);
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json('Champ du formulaire manquant', {
      status: 406,
    });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json('Votre adresse email est invalide', {
      status: 406,
    });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = {
    email,
    password: hashedPassword,
  };

  let emailAlreadyUsed;

  try {
    emailAlreadyUsed = await UserModel.findOne({ email });
  } catch (error) {
    return NextResponse.json('Un problème est survenu', {
      status: 500,
    });
  }

  if (emailAlreadyUsed) {
    return NextResponse.json('Cette adresse email est déjà utilisée', {
      status: 403,
    });
  }

  try {
    await UserModel.create(newUser);
    return NextResponse.json('Utilisateur enregistré avec succès', {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json('Un problème est survenu', {
      status: 500,
    });
  } finally {
    dbDisconnect();
  }
}
