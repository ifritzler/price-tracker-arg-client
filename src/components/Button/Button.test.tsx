import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

describe("Button", () => {
    it("check renders button unchanged", () => {
        const { container } = render(<Button text="Button" typeb="button"/>);
        expect(container).toMatchSnapshot("button");
        
        const { container: containerLinkButton } = render(<Button text="Button" typeb="button-link" url="www.google.com"/>);
        expect(containerLinkButton).toMatchSnapshot("link-button");
    })
    
    it("text button should render", () => {
        render(<Button text="Button 1" typeb="button"/>);
        const button = screen.getByRole('button')

        expect(button).toHaveTextContent("Button 1")
    })
    
    it("button should be a link if url exists", () => {
        render(<Button text="Button 1" typeb="button-link" url="www.google.com"/>);
        
        const button = screen.getByRole('link')
    
        expect(button).toHaveAttribute('href', 'www.google.com')
    })

    it("url must be root if url is empty", () => {
        render(<Button text="Button 1" typeb="button-link" url=""/>);
        
        const button = screen.getByRole('link')
    
        expect(button).toHaveAttribute('href', '/')
    })

    it("text must shows when onlyIcon is not defined", () => {
        render(<Button text="Button 1" typeb="button-link" url="www.google.com"/>);
        
        const button = screen.getByRole('link')
        
        expect(button).toHaveTextContent('Button 1')
    })
    
    it("Behaviour button on click", () => {
        const onClickMock = jest.fn();
        render(<Button text="Button 1" typeb="button" onClick={onClickMock}/>);
        
        const button = screen.getByRole('button')
        fireEvent.click(button)

        expect(onClickMock).toHaveBeenCalled();
        expect(onClickMock).toHaveBeenCalledTimes(1);
    })
})