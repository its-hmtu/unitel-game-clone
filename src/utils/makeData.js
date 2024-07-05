import {faker} from '@faker-js/faker'

const range = (size) => {
  const arr = []

  for (let i = 0; i < size; i++) {
    arr.push(i)
  }

  return arr
}

const newNoti = () => {
  return {
    player: faker.animal.cat(),
    reward: faker.animal.cat(),
  }
}

export const makeData = (key, ...size) => {
  const level = (depth = 0) => {
    const len = size[depth];
    const data = () => {
      if (key === 'noti') {
        return newNoti();
      }
    }

    return range(len).map(d => {
      return {
        ...data(),
        subRows: size[depth + 1] ? level(depth + 1) : undefined,
      }
    })
  }

  return level();
}


// import { faker } from '@faker-js/faker'

// const range = len => {
// 	const arr = []
// 	for (let i = 0; i < len; i++) {
// 		arr.push(i)
// 	}
// 	return arr
// }

// const newRoom = () => {
// 	const player = faker.datatype.number({ min: 1, max: 2 })
// 	let status
// 	if (player === 1) {
// 		status = 0
// 	} else status = 1

// 	return {
// 		id: faker.datatype.number({ min: 100000, max: 999999 }),
// 		player,
// 		coin: faker.datatype.number({ min: 1000, max: 99999 }),
// 		status,
// 	}
// }

// const newGame = () => {
// 	return {
// 		id: faker.datatype.number(5),
// 		game: faker.animal.cat(),
// 		player: faker.datatype.number(10000),
// 		desc: faker.lorem.paragraphs(5),
// 		image: faker.image.cats(),
// 	}
// }

// const newFriend = () => {
// 	return {
// 		id: faker.datatype.number(999999),
// 		player: faker.name.firstName(),
// 		gold: faker.datatype.number(999999),
// 		status: faker.datatype.number(1),
// 		avatar: faker.image.cats(),
// 	}
// }

// const newInvitation = () => {
// 	return {
// 		id: faker.datatype.number(999999),
// 		player: faker.name.firstName(),
// 		playerGold: faker.datatype.number(999999),
// 		roomId: faker.datatype.number({ min: 100000, max: 999999 }),
// 		game: faker.animal.cat(),
// 		gameId: faker.datatype.number(5),
// 		bet: faker.datatype.number({ min: 1000, max: 99999 }),
// 		playerAva: faker.image.cats(),
// 		status: faker.datatype.number(1),
// 		info: {
// 			player: faker.name.firstName(),
// 			playerAva: faker.image.cats(),
// 			status: faker.datatype.number(1),
// 		},
// 	}
// }

// const newUser = () => {
// 	return {
// 		id: faker.datatype.number({ min: 10000000, max: 99999999 }),
// 		name: faker.name.firstName(),
// 		playerGold: faker.datatype.number(999999),
// 		referralCode: faker.phone.number('#########-#########-##########'),
// 		avatar: faker.image.cats(),
// 		phone: faker.phone.number('### ### ####'),
// 	}
// }

// const newImage = () => {
// 	return {
// 		id: faker.datatype.number(999),
// 		image: faker.image.cats(),
// 	}
// }

// const newReward = () => {
// 	const date = new Date(faker.datatype.datetime())
// 	return {
// 		id: faker.datatype.number(999),
// 		image: faker.image.cats(),
// 		title: faker.animal.cat(),
// 		desc: faker.lorem.sentence(5),
// 		gold: faker.datatype.number(999999),
// 		date: new Intl.DateTimeFormat('lo-LA').format(date),
// 	}
// }

// const newPackage = () => {
// 	return {
// 		id: faker.datatype.number(999),
// 		title: faker.animal.cat(),
// 		gold: faker.datatype.number(999999),
// 		price: faker.datatype.number(99999),
// 	}
// }

// const newRanking = () => {
// 	return {
// 		id: faker.datatype.number(999999),
// 		player: faker.animal.cat(),
// 		gold: faker.datatype.number(999999),
// 		winRate: `${faker.datatype.number(999)}/${faker.datatype.number(999)}`,
// 		avatar: faker.image.cats(),
// 	}
// }

// const newNoti = () => {
// 	return {
// 		player: faker.animal.cat(),
// 		reward: faker.animal.cat(),
// 	}
// }

// export function makeData(dataName, ...lens) {
// 	const makeDataLevel = (depth = 0) => {
// 		const len = lens[depth]
// 		const data = () => {
// 			try {
//         if (dataName === 'game') return newGame()
//         if (dataName === 'friend') return newFriend()
//         if (dataName === 'invitation') return newInvitation()
//         if (dataName === 'user') return newUser()
//         if (dataName === 'room') return newRoom()
//         if (dataName === 'image') return newImage()
//         if (dataName === 'reward') return newReward()
//         if (dataName === 'pack') return newPackage()
//         if (dataName === 'rank') return newRanking()
//         if (dataName === 'noti') return newNoti()
//       } catch (e) {
//         throw new Error(e)
//       }
// 		}
// 		return range(len).map(d => {
// 			return {
// 				...data(),
// 				subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
// 			}
// 		})
// 	}

// 	return makeDataLevel()
// }
 
