import { Container, Fullscreen, Text } from "@react-three/uikit";

export function UIKitScene() {
  return (
    <>
      <Fullscreen distanceToCamera={1} padding={32}>
        <Container
          height={40}
          width={"100%"}
          flexDirection={"row"}
          borderWidth={1}
          borderColor="white"
        >
          <Container flexGrow={1} backgroundOpacity={0.05} backgroundColor="#D4FE00" />
          <Container
            flexGrow={1}
            onHoverChange={(hovered) => console.log("hovered", hovered)}
            backgroundColor="blue"
          />
          <Button />
        </Container>
      </Fullscreen>
      <color attach="background" args={["#161616"]} />
    </>
  );
}

function Button() {
  return (
    <Container
      height={40}
      flexGrow={1}
      borderWidth={1}
      borderOpacity={0.1}
      borderColor="#D4FE00"
      backgroundOpacity={0.05}
      backgroundColor="#D4FE00"
      hover={{
        backgroundOpacity: 0.1,
      }}
    >
      <Text color="white" fontSize={20}>
        Hello
      </Text>
    </Container>
  );
}
