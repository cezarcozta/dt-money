import styled from 'styled-components';

type ICard = {
   isBalance?: boolean;
}

export const Container = styled.section<ICard>`
   background: ${props => props.isBalance ? `var(--green)` : `var(--shape)`};
   padding: 1.5rem 2.5rem;
   border-radius: 0.25rem;
   color: ${props => props.isBalance ? `#FFFFFF` : `var(--titleText)`};

   header{
      display: flex;
      align-items: center;
      justify-content: space-between;
   }

   strong{
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
   }
`;