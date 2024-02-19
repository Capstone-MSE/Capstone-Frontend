import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import {Outlet} from 'react-router-dom';


const categories = [
  {
    name: 'mainpage',
    text: '홈'
  },
  {
    name: 'signup',
    text: '회원가입'
  },
  {
    name: 'login',
    text: '로그인'
  }
];

/* 상단의 카테고리 블락 스타일링 */
const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

/* 카테고리 버튼 영역 스타일 */
const Category = styled(NavLink)`
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;

  &:hover{
    color: #495057;
  }

  &+&{
    margin-left: 1rem;
  }
`;

/* 카테고리 컴포넌트 */
const Categories = () => {
  return(
    <div>
      <header>
        <CategoriesBlock>
          {categories.map(c => (
            <Category
              key={c.name}
              to={c.name==='mainpage'?'/':`/${c.name}`}
            >
              {c.text}
            </Category>
          ))}
        </CategoriesBlock>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Categories;