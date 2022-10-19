import React from 'react';
import styled from 'styled-components';
import { Badge } from '@masochistme/sdk/dist/v1/types';

import { Flex, Section, Tooltip } from 'components';
import { useGameBadges } from 'sdk';
import { Description, Field, BadgeImg } from './components';

type Props = {
	gameId: number;
	isCompact?: boolean;
};

export const Badges = (props: Props): JSX.Element | null => {
	const { gameId, isCompact = false } = props;

	const { gameBadgesData: badges, isFetched: isBadgeListLoaded } =
		useGameBadges(gameId);

	if (!isBadgeListLoaded || !badges?.length) return null;

	return isCompact ? (
		<BadgesSizeCompact badges={badges} />
	) : (
		<BadgesSizeStandard badges={badges} />
	);
};

const BadgesSizeCompact = ({ badges }: { badges: Badge[] }) => {
	return (
		<StyledBadges>
			<Section>
				<h3>Badges</h3>
				<Flex row margin="8px">
					{badges.map((badge: Badge) => (
						<Tooltip
							content={`${badge.points} pts - ${badge.name}\n"${badge.description}"`}>
							<BadgeImg
								style={{ margin: '5px 10px 5px 5px' }}
								src={badge.img}
								alt="badge"
								key={`badge-${String(badge._id)}`}
							/>
						</Tooltip>
					))}
				</Flex>
			</Section>
		</StyledBadges>
	);
};

const BadgesSizeStandard = ({ badges }: { badges: Badge[] }) => {
	return (
		<StyledBadges>
			<Section>
				<h3>Badges</h3>
				<Flex
					column
					width="100%"
					height="100%"
					padding="0 10px 10px 10px"
					boxSizing="border-box">
					{badges.map((badge: Badge) => (
						<Description key={`badge-description-${badge._id}`}>
							<h4 style={{ margin: 0, textAlign: 'center' }}>
								{badge.name?.toUpperCase()}
							</h4>
							<Flex row width="100%">
								<BadgeImg
									style={{ margin: '5px 10px 5px 5px' }}
									src={badge.img}
									alt="badge"
									key={`badge-image-${badge._id}`}
								/>
								<Flex column width="100%">
									<Field>Points: {badge.points} pts</Field>
									<Field>Proof: {badge.requirements}</Field>
									<Field>Description: {badge.description}</Field>
								</Flex>
							</Flex>
						</Description>
					))}
				</Flex>
			</Section>
		</StyledBadges>
	);
};

const StyledBadges = styled.div`
	min-width: 400px;
`;
