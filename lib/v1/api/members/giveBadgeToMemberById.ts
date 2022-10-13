import axios, { AxiosResponse } from 'axios';
import { InsertOneResult } from 'mongodb';

import { MemberBadge, ResponseError } from 'v1/types';

/**
 * Gives a badge by given badge ID to member by their Discord ID.
 *
 * @category Members
 */
export const giveBadgeToMemberById = async (
	{ badgeId, memberId }: { badgeId: string; memberId: string },
	BASE_URL: string,
): Promise<InsertOneResult<MemberBadge>> => {
	const url = `${BASE_URL}/members/member/${memberId}/badges/badge/${badgeId}`;

	const memberBadgeResponse = await axios.post<
		InsertOneResult<MemberBadge> | ResponseError,
		AxiosResponse<InsertOneResult<MemberBadge> | ResponseError>
	>(url, {}, { validateStatus: () => true });

	const { status, data } = memberBadgeResponse;

	if (status !== 201) throw new Error((data as ResponseError).error);
	return data as InsertOneResult<MemberBadge>;
};
