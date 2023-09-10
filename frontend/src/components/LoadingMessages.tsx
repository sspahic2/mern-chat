import { Card, CardBody, Flex, SkeletonText, VStack } from "@chakra-ui/react";

const LoadingMessages = () => {
  const renderLoadingElements = [
    { id: 1, justify: 'start' },
    { id: 2, justify: 'end' },
    { id: 3, justify: 'start' }
  ];
  return (
    <>
      {
        renderLoadingElements.map((t) => {
          return (
            <Flex w={'100%'} key={t.id} justify={t.justify}>
              <Card maxW={'70%'} minW={'120px'} bg={t.id % 2 == 0 ? 'var(--chakra-colors-gray-600)' : 'var(--chakra-colors-gray-800)'}>
                <CardBody paddingInline={2} paddingBlock={2}>
                  <VStack align={'center'}>
                    <Flex w={'100%'} color={'#EAEEFF'}>
                      <SkeletonText flex={1} mt='4' noOfLines={2} spacing='4' skeletonHeight='2' w={'200px'} />
                    </Flex>
                    <Flex 
                      w={'100%'}
                      color={'var(--text-color-red)'} 
                      fontSize={'xs'} 
                      justify={'end'}
                    >
                      <SkeletonText flex={1} noOfLines={1} spacing='4' skeletonHeight='2' w={'100px'} />
                    </Flex>
                  </VStack>
                </CardBody>
              </Card>
            </Flex>
          )
        })
      }
    </>
  )
};

export default LoadingMessages;