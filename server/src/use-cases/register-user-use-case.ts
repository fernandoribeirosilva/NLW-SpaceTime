import { IUserRepository } from '@/repositories/IUser-repository'
import axios from 'axios'
import { FastifyReply } from 'fastify'
import { z } from 'zod'

interface RegisterUserRequest {
  code: string
}

// interface RegisterUserResponse {
//   memory: Memory
// }

export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ code }: RegisterUserRequest, reply: FastifyReply) {
    const accessTokenData = await axios.post(
      'https://github.com/login/oauth/access_token',
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    )

    const { access_token } = accessTokenData.data

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    })

    const userInfo = userSchema.parse(userResponse.data)

    let user = await this.userRepository.findById(userInfo.id)

    if (!user) {
      user = await this.userRepository.create({
        githubId: userInfo.id,
        login: userInfo.login,
        name: userInfo.name,
        avatarUrl: userInfo.avatar_url,
      })
    }

    const token = await reply.jwtSign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: '30 days',
      },
    )

    return {
      token,
    }
  }
}
