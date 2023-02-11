import React from 'react';
import styled from 'styled-components';

import { fonts, media, useTheme, ColorTokens } from 'styles';
import { Flex } from 'components';
import { ButtonsSocialMedia, Logo } from 'containers';

export const Header = (): JSX.Element => {
	const { colorTokens } = useTheme();
	return (
		<StyledHeader align colorTokens={colorTokens}>
			<Logo />
			<StyledHeaderTitle>
				<span>Masochist.ME</span>
				<StyledHeaderSubTitle>
					{' '}
					- games that masochists love
				</StyledHeaderSubTitle>
			</StyledHeaderTitle>
			<ButtonsSocialMedia />
		</StyledHeader>
	);
};

const StyledHeader = styled(Flex)<{ colorTokens: ColorTokens }>`
	min-width: 100%;
	max-width: 100%;
	height: 70px;
	padding: 12px 32px;
	justify-content: space-between;
	background-color: ${({ colorTokens }) =>
		colorTokens['element-color--header-bg']};
	color: ${({ colorTokens }) => colorTokens['element-color--header-text']};
	font-family: ${fonts.Raleway};
`;

const StyledHeaderTitle = styled.h1`
	font-size: 1.2em;
	font-weight: normal;
	letter-spacing: 0.5em;
	margin: 0 10px;
	text-align: center;
	text-transform: uppercase;

	@media (max-width: ${media.tablets}) {
		letter-spacing: 0em;
	}
`;

const StyledHeaderSubTitle = styled.span`
	@media (max-width: ${media.tablets}) {
		display: none;
	}
`;
