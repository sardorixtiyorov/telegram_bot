import { branches } from './data/mock';
import { Ctx, Hears, On, Start, Update } from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';
import { keyboards } from './enums/keyboard.enums';
import { getDistance } from './utils/get-distance.utils';
import { UserService } from './user/user.service';
import { LocationService } from './location/location.service';

@Update()
export class AppService {
  constructor(
    private readonly userService: UserService,
    private readonly locationService: LocationService,
  ) {}
  @Start()
  start(@Ctx() ctx: Context) {
    const keyboard = Markup.keyboard([keyboards.register, keyboards.support])
      .resize()
      .oneTime();
    ctx.reply('salom', keyboard);
  }

  @Hears(keyboards.register)
  register(@Ctx() ctx: Context) {
    const keyboard = Markup.keyboard([
      Markup.button.contactRequest(keyboards.contact),
    ])
      .resize()
      .oneTime();
    ctx.reply('ENTER YOUR POHNE NUMBER', keyboard);
  }

  @Hears(keyboards.support)
  support(@Ctx() ctx: any) {
    ctx.reply('ANY QUESTIONS');
  }

  @On('contact')
  async contact(@Ctx() ctx: any) {
    const phoneNumber = ctx.update.message.contact.phone_number;
    const user = ctx.update.message.from;
    const id = user.id;
    user.id = undefined;
    await this.userService.create({
      tg_id: Number(id),
      ...user,
    });

    const keyboard = Markup.keyboard([
      Markup.button.locationRequest(keyboards.location),
    ])
      .resize()
      .oneTime();
    console.log(phoneNumber);
    ctx.reply('Now ENTER your LOCATION', keyboard);
  }

  @On('location')
  location(@Ctx() ctx: any) {
    try {
      const location = ctx.update.message.location;

      const nearestBranch = branches.reduce(
        (acc: any, branch: any, index: number) => {
          const distance = getDistance(
            branch.latitude,
            location.latitude,
            branch.longitude,
            location.longitude,
          );

          console.log(branch.name, '=', distance);

          if (!acc) {
            return {
              branchIndex: index,
              distance,
            };
          }

          if (distance < acc.distance)
            return {
              branchIndex: index,
              distance,
            };

          return acc;
        },
        null,
      );

      console.log(ctx.update.message);

      ctx.telegram.sendLocation(
        ctx.update.message.chat.id,
        branches[nearestBranch?.branchIndex].longitude,
        branches[nearestBranch?.branchIndex].latitude,
      );

      ctx.reply(
        `Sizga yaqin bo'lgan filialimiz ${
          branches[nearestBranch?.branchIndex].name
        }da joylashgan`,
      );
    } catch (err) {
      console.log(err);
    }
  }
}
