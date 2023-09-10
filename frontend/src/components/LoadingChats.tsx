import {Flex, HStack, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const LoadingChats = () => {
  const numberOf = [1, 2, 3];
  return (
    <>
      {
        numberOf.map(_ =>  
            <Flex align={'center'} margin={'auto'} pb={5} key={_} w={'100%'}>
              <HStack mb={10}>
                <SkeletonCircle size='10' />
                <SkeletonText flex={1} mt='4' noOfLines={2} spacing='4' skeletonHeight='2' w={'100px'} />
              </HStack>
            </Flex>
        )
      }
    </>
  );
};

export default LoadingChats;
