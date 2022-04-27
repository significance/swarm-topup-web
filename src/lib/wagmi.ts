// Types
import type { Result } from 'ethers/lib/utils'
import type { useContractRead } from 'wagmi'

const isAllTrue = <ArrayType>(array: ArrayType[], key: keyof ArrayType) => {
	return array.every((element) => element[key])
}

const isAnyTrue = <ArrayType>(array: ArrayType[], key: keyof ArrayType) => {
	return array.some((element) => element[key])
}

// TODO: Somehow type the return value to ArrayType[key]
const getFirstTruthy = <ArrayType>(
	array: ArrayType[],
	key: keyof ArrayType
): any => {
	for (const element of array) {
		if (element[key]) {
			return element[key]
		}
	}
}

export const combineContractReads = (
	combineData: (...results: ReturnType<typeof useContractRead>[]) => Result,
	...results: ReturnType<typeof useContractRead>[]
): Omit<
	ReturnType<typeof useContractRead>,
	'status' | 'fetchStatus' | 'internal'
> => {
	return {
		data: combineData(...results),
		error: getFirstTruthy(results, 'error'),
		isIdle: isAllTrue(results, 'isIdle'),
		isLoading: isAllTrue(results, 'isLoading'),
		isFetching: isAllTrue(results, 'isFetching'),
		isSuccess: isAllTrue(results, 'isSuccess'),
		isError: isAnyTrue(results, 'isError'),
		isFetched: isAllTrue(results, 'isFetched'),
		isRefetching: isAnyTrue(results, 'isRefetching'),

		// TODO: Fix typings
		refetch: async (options): Promise<any> => {
			const args = await Promise.all(
				results.map((result) => result.refetch(options))
			)
			return combineContractReads(combineData, args as any)
		},
	}
}
